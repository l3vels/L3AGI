import * as yup from 'yup'
import { isEmpty } from 'lodash'

import { COMPANY_SIZE_OPTIONS, COMPANY_ROLE_OPTIONS } from 'utils/constants'

const companySizes = COMPANY_SIZE_OPTIONS.map(item => item.value)
const companyRoles = COMPANY_ROLE_OPTIONS.map(item => item.value)

export const registrationValidation = yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  last_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),
  company_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter the name of your company'),

  company_size: yup
    .string()
    .required('Please select the size of your fleet')
    .oneOf(companySizes, 'invalid value'),
  company_role: yup
    .string()
    .required('Please select your role in the company')
    .oneOf(companyRoles, 'invalid value'),
  location: yup.string().required('Please select your location'),

  contact: yup
    .string()
    .required('Please enter your contact number')
    .min(10, 'Too Short!')
    .max(11, 'Too Long!'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@l3vels.xyz'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character.',
    ),
  confirm_password: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], "Passwords don't match."),
})

export const assetProcurementValidation = yup.object().shape(
  {
    // procurement_type: yup.string().required(),
    down_payment: yup
      .number()
      // .nullable(true)
      .when(['procurement_type'], {
        is: 'finance_lease',
        then: yup
          .number()
          .when(['purchase_price', 'balloon_payment'], (purchasePrice, ballonPayment) => {
            if (purchasePrice && ballonPayment)
              return yup
                .number()
                .max(
                  purchasePrice + ballonPayment,
                  'Down payment cannot be greater than purchase price + balloon payment',
                )
            else return yup.number()
          }),
      }),
    balloon_payment: yup
      .number()
      // .nullable(true)
      .when(['procurement_type'], {
        is: 'finance_lease',
        then: yup
          .number()
          .when(['purchase_price', 'down_payment'], (purchasePrice, downPayment) => {
            if (purchasePrice && downPayment)
              return yup
                .number()
                .max(
                  purchasePrice + downPayment,
                  'Balloon payment cannot be greater than purchase price + down payment',
                )
            else return yup.number()
          }),
      }),
    interest_rate: yup
      .number()
      // .nullable(true)
      .when(['procurement_type'], {
        is: 'finance_lease',
        then: yup
          .number()
          .min(1, 'Interest rate should be greater than 0')
          .required('Interest rate cannot be blank'),
      }),

    operating_lease_monthly_payment: yup
      .number()
      .nullable(true)
      .when(['procurement_type'], {
        is: 'operating_lease',
        then: yup.number().when(['purchase_price'], purchasePrice => {
          if (purchasePrice)
            return yup
              .number()
              .required('Monthly payment cannot be blank')
              .max(purchasePrice, 'Operating lease cannot be greater than purchase price')
          else return yup.number().required('Monthly payment cannot be blank')
        }),
      }),
  },
  [
    ['purchase_price', 'down_payment'],
    ['purchase_price', 'balloon_payment'],
  ],
)

const currentYear = new Date().getFullYear()

export const vehicleValidation = yup.object().shape({
  asset_number: yup
    .string()
    .min(1, 'Asset number must be greater then 0')
    .max(8, 'Too long')
    .typeError('You must specify a number')
    .matches(/^[a-zA-Z0-9]+$/, 'Asset number cannot have special characters'),
  registration_number: yup
    .string()
    .min(1, 'Registration number must be greater then 0')
    .max(8, 'Too long')
    .required('Registration number cannot be blank.')
    .matches(/^[a-zA-Z0-9]+$/, 'Registration number cannot have special characters'),
  delivery_date: yup.string().required('Delivery date cannot be blank.'),
  odometer: yup
    .number()
    .min(1, 'Odometer must be greater then 0')
    .max(99999999.99, 'Too long')
    .required('Odometer cannot be blank.')
    .typeError('You must specify a number'),
  purchase_price: yup
    .number()
    .min(1, 'Purchase price should be greater than 0')
    .max(99999999.99, 'Too long')
    .typeError('You must specify a number')
    .required('Purchase price cannot be blank.'),
  garage_id: yup.string().nullable(true),
  asset_class: yup.string().required('Asset class cannot be blank.'),
  asset_subclass: yup.string().required('Asset subclass cannot be blank.'),
  tag: yup.string().max(20, 'Too long'),
  description: yup.string().max(200, 'Too long'),
  replacement_month: yup
    .number()
    .max(999, 'Too long')
    .typeError('You must specify a number')
    .required('Replacement months cannot be blank.'),
  replacement_distance: yup
    .number()
    .max(9999999, 'Too long')
    .typeError('You must specify a number')
    .required('Replacement distance cannot be blank.'),
  make: yup.object().nullable(true),
  model: yup.object().nullable(true),
  vehicle_trim: yup.string().max(50, 'Too long'),
  year: yup
    .number()
    .min(1975, 'Model year should be less than or equal to current year')
    .max(currentYear, 'Model year should be less than or equal to current year')
    .nullable(true)
    .typeError('Model year seems invalid.'),
  body_type: yup.object().nullable(true),
  drive_type: yup.string().required('Drive type cannot be blank'),
  fuel_type: yup.string().required('Fuel type cannot be blank'),
  power_train: yup.string().required('Powertrain cannot be blank'),
  gvm: yup
    .number()
    .min(1, 'gvm should be greater than 0')
    .max(99999, 'Too long')
    .required('GVM cannot be blank'),
  chassis_weight: yup.number().typeError('You must specify a number').max(99999, 'Too long'),
  body_weight: yup.number().typeError('You must specify a number').max(99999, 'Too long'),
  payload: yup.number().typeError('You must specify a number').max(99999, 'Too long'),
  cargo_volume: yup
    .number()
    .typeError('You must specify a number')
    .max(99, 'Too long')
    .nullable(true),
  gradeability: yup
    .number()
    .typeError('You must specify a number')
    .max(100, 'Too long')
    .nullable(true),
  procurement_type: yup.string().required('Procurement type cannot be blank'),
  accessory_cost: yup
    .number()
    .typeError('You must specify a number')
    .max(9999999, 'Too long')
    .nullable(true),
  service_cost: yup.number().when('servicing_and_tyres', servicing_and_tyres => {
    if (servicing_and_tyres?.length > 0 || !isEmpty(servicing_and_tyres))
      return yup.number().max(99, 'Too long')
    else return yup.number().max(99, 'Too long').required('Service cost cannot be blank')
  }),
  tyre_cost: yup
    .number()
    .nullable(true)
    .when('servicing_and_tyres', servicing_and_tyres => {
      if (servicing_and_tyres?.length > 0 || !isEmpty(servicing_and_tyres))
        return yup.number().max(99, 'Too long')
      else return yup.number().max(99, 'Too long').required('Tyre cost cannot be blank')
    }),

  residual_type: yup.string().required('Residual type cannot be blank.'),
  residual_value: yup.number().typeError('You must specify a number'),
  business_use_percentage: yup.number().typeError('You must specify a number'),
  // .min(0, 'business use value should be greater than 0')
  // .required('Business use cannot be blank'),
  night_parking_garage_id: yup.string().nullable(true),

  use_on_public_roads: yup
    .number()
    .min(0, 'Use on public roads must be between 0 to 100.00')
    .max(100.0, 'Use on public roads must be between 0 to 100.00')
    // .required('Use on public roads cannot be blank')
    .typeError('You must specify a number'),
  variant: yup.string().max(300, 'variant must be shorter than or equal to 300 characters'),
})

export const definitionValidation = yup.object().shape({
  asset_class: yup.string().required('Asset class cannot be blank.'),
  asset_subclass: yup.string().required('Asset subclass cannot be blank.'),
  annual_distance: yup.number().nullable().typeError('You must specify a number'),
  fuel_efficiency: yup.number().nullable().typeError('You must specify a number'),
  max_daily_use: yup.number().nullable().typeError('You must specify a number'),
  replacement_months: yup.number().nullable().typeError('You must specify a number'),
  replacement_distance: yup.number().nullable().typeError('You must specify a number'),
  insurance_cost_year: yup.number().nullable().typeError('You must specify a number'),
  registration_cost_year: yup.number().nullable().typeError('You must specify a number'),
  tyre_cost_km: yup.number().nullable().typeError('You must specify a number'),
  procurement_type: yup.string(),
  vehicle_discount_rate: yup.number().nullable().typeError('You must specify a number'),
  on_public_road_use_percentage: yup.number().nullable().typeError('You must specify a number'),
})

export const depreciationValidation = yup.object().shape({
  asset_class: yup.string().required('Asset class cannot be blank.'),
  power_train: yup.string().required('Powertrain cannot be blank'),
  depreciation: yup.number().typeError('You must specify a number'),
})

export const chargersValidation = yup.object().shape({
  charger_type: yup.string().required('Charger type cannot be blank.'),
  brand: yup.string().required('Brand cannot be blank.').max(15, 'Too long'),
  charging_power: yup
    .number()
    .required('Charging power cannot be blank.')
    .typeError('You must specify a number'),
  hardware_cost: yup.number().nullable().typeError('You must specify a number'),
  installation_cost: yup.number().nullable().typeError('You must specify a number'),
  annual_subscription: yup.number().nullable().typeError('You must specify a number'),
})

export const energyDemandValidation = yup.object().shape({
  capacity: yup
    .number()
    .required('Capacity cannot be blank')
    .typeError('You must specify a number'),
  site_cost_min: yup.number().typeError('You must specify a number').nullable(true),
  site_cost_max: yup.number().typeError('You must specify a number').nullable(true),
  upstream_cost_min: yup.number().typeError('You must specify a number').nullable(true),
  upstream_cost_max: yup.number().typeError('You must specify a number').nullable(true),
})

export const electricityValidation = yup.object().shape({
  year: yup
    .number()
    .max(9999, 'Too long')
    .typeError('You must specify a number')
    .required('Year cannot be blank'),
  supply_charge: yup
    .number()
    .max(99, 'Too long')
    .typeError('You must specify a number')
    .required('Supply charge cannot be blank'),
  peak_rate: yup
    .number()
    .max(99, 'Too long')
    .typeError('You must specify a number')
    .required('Peak rate cannot be blank'),
  off_peak_rate: yup
    .number()
    .max(99, 'Too long')
    .typeError('You must specify a number')
    .required('Off peak rate cannot be blank'),
  shoulder_rate: yup
    .number()
    .max(99, 'Too long')
    .typeError('You must specify a number')
    .required('Shoulder rate cannot be blank'),
  capacity_charge: yup
    .number()
    .max(99, 'Too long')
    .typeError('You must specify a number')
    .required('Capacity charge cannot be blank'),
  metering_charge: yup
    .number()
    .max(99, 'Too long')
    .typeError('You must specify a number')
    .required('Metering charge cannot be blank'),
  renewable: yup
    .number()
    .max(99, 'Too long')
    .typeError('You must specify a number')
    .required('Renewable cannot be blank'),
})

export const chargingInfrastructureValidation = yup.object().shape({
  charger_name: yup.string().max(200, 'Too long').required('Charger name cannot be blank'),
  // .matches(/^[ a-zA-Z0-9]+$/, 'Charger name can not have special characters'),
  zone: yup.string().max(20, 'Too long').required('Zone cannot be blank'),
  power: yup.string().required('Charger type cannot be blank'),
  type: yup.string().max(50, 'Too long'),
  kilowatts: yup.number().max(9999, 'Too long').required('Kilowatts cannot be blank'),
})

export const garageLocationsValidation = (garageLists: any, id?: string) =>
  yup.object().shape({
    electricity: yup
      .array()
      .min(1, 'Please add at least one electricity')
      .required('Please add at least one electricity'),
    location_name: yup
      .string()
      .max(50, 'Too long')
      .matches(/^[ a-zA-Z0-9]+$/, 'Location name can not have special characters')
      .required('Location name cannot be blank')
      .test(
        'Location name unique',
        'Location name already exists for this fleet. Enter a different name',
        value => {
          if (!garageLists) return true
          for (const garage of garageLists) {
            if (
              (id &&
                garage.id !== id &&
                garage.location_name.toLowerCase() === value?.toLowerCase()) ||
              (!id && garage.location_name.toLowerCase() === value?.toLowerCase())
            ) {
              return false
            }
          }
          return true
        },
      ),
    contact_person: yup.string().max(50, 'Too long'),
    // .matches(/^[a-zA-Z0-9]+$/, 'Contact person cannot have special characters'),
    site_address: yup.string(),
    access_type: yup.string(),
    number_of_car_spaces: yup
      .number()
      .nullable()
      .integer('Number of car spaces must be an integer')
      .max(9999, 'Too long')
      .typeError('You must specify a number'),
    maximum_switchboard_capacity: yup
      .number()
      .max(9999999, 'Too long')
      // .required('Maximum switchboard capacity cannot be blank')
      .typeError('You must specify a number'),
    site_maximum_demand: yup
      .number()
      .when('maximum_switchboard_capacity', maximumSwitchboardCapacity =>
        yup
          .number()
          // .required('Site maximum demand cannot be blank')
          .max(
            maximumSwitchboardCapacity,
            'Site maximum demand cannot be greater than maximum switchboard capacity',
          ),
      ),
    site_available_capacity: yup
      .number()
      .when(
        ['maximum_switchboard_capacity', 'site_maximum_demand'],
        (maximumSwitchboardCapacity, siteMaximumDemand) =>
          yup
            .number()
            // .required('Site maximum demand cannot be blank')
            .max(
              maximumSwitchboardCapacity - siteMaximumDemand,
              'Site available capacity cannot be greater than maximum switchboard capacity - site maximum demand',
            ),
      ),
    available_capacity_last_checked: yup.date().typeError('You must specify a date'),
    location_of_switchboard: yup
      .string()
      .max(50, 'Too long')
      .matches(/^[ a-zA-Z0-9]+$/, 'Location of switchboard can not have special characters'),
    average_distance_between_switchboards: yup
      .number()
      .nullable()
      .integer('Average distance between switchboards must be an integer')
      .max(99999, 'Too long')
      .typeError('You must specify a number'),
    contract_type: yup.string().required('Contract type cannot be blank.').nullable(),
    light_vehicles_number_per_charger: yup
      .number()
      .integer('Light vehicles number per charger must be an integer')
      .max(9999, 'Too long')
      .min(1, 'Number should be greater than 0')
      .required('Light vehicles number per charger cannot be blank')
      .typeError('You must specify a number'),
    heavy_vehicles_number_per_charger: yup
      .number()
      .integer('Heavy vehicles number per charger must be an integer')
      .max(9999, 'Too long')
      .min(1, 'Number should be greater than 0')
      .required('Heavy vehicles number per charger cannot be blank')
      .typeError('You must specify a number'),
  })

export const RateValidation = yup.object().shape({
  electricity_rate_name: yup.string().required('Electricity rate name cannot be blank'),
  rates: yup.array().of(
    yup.object().shape({
      charging_profile: yup
        .number()
        .max(100, 'Charging profile % must be between 0 to 100')
        .min(0, 'Charging profile % must be between 0 to 100'),
    }),
  ),
})

export const fuelUsageValidation = yup.object().shape({
  annual_distance: yup
    .number()
    .max(999999999.99, 'Too long')
    .min(1, 'Annual distance should be greater than 0')
    .required('Annual distance cannot be blank'),
  fuel_efficiency: yup
    .number()
    .max(999.99, 'Too long')
    .min(1)
    .required('Fuel efficiency cannot be blank'),
  max_daily_use: yup
    .number()
    .max(999.99, 'Too long')
    .min(1, 'Max daily use should be greater than 0')
    .required('Max daily use cannot be blank'),
})

export const fuelValidation = yup.object().shape({
  registration_number: yup
    .string()
    .max(8, 'Too long')
    .matches(/^[ a-zA-Z0-9]+$/, 'Registration number can not have special characters')
    .required('Registration number cannot be blank'),
  transaction_date: yup
    .number()
    .nullable()
    .required('Transaction date cannot be blank')
    .typeError('Transaction date is not the selected format'),
  odometer: yup
    .number()
    .max(9999999.99, 'Too long')
    .nullable()
    .required('Odometer cannot be blank')
    .typeError('Odometer should be numeric'),
  fuel_volume: yup
    .number()
    .max(999.99)
    .nullable()
    .required('Fuel volume cannot be blank')
    .typeError('Fuel volume should be numeric'),
  cost: yup.number().max(9999999.99, 'Too long').typeError('Cost should be numeric'),
})

export const transitionPlanValidation = yup.object().shape({
  description: yup.string().required('Description cannot be blank'),
})

export const administrationValidation = yup.object().shape({
  shared_email: yup
    .string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@l3vels.xyz'),
})

export const apiKeyValidation = yup.object().shape({
  name: yup.string().required('Name cannot be blank'),
  note: yup.string().nullable(),
  expiration: yup.date().nullable(),
})

export const webhookValidation = yup.object().shape({
  url: yup.string().url('Invalid URL').required('Required'),
  description: yup.string().nullable(),
})

export const createUserValidation = yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  last_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),

  company_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter the name of your company'),

  company_size: yup
    .string()
    .required('Please select the size of your fleet')
    .oneOf(companySizes, 'invalid value'),
  company_role: yup
    .string()
    .required('Please select your role in the company')
    .oneOf(companyRoles, 'invalid value'),
  location: yup.string().required('Please select your location'),

  contact_number: yup
    .string()
    .required('Please enter your contact number')
    .min(10, 'Too Short!')
    .max(11, 'Too Long!'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@l3vels.xyz'),
})
export const createAdminValidation = yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name'),
  last_name: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your last name'),

  location: yup.string().required('Please select your location'),

  contact_number: yup
    .string()
    .required('Please enter your contact number')
    .min(10, 'Too Short!')
    .max(11, 'Too Long!'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Please use a valid email format. Example - user@l3vels.xyz'),
})

export const gameValidationSchema = yup.object().shape({
  game_name: yup.string().required('Name cannot be blank'),
  game_category: yup.string().required('Category cannot be blank'),
  // game_description:yup.string().required('Description cannot be blank'),
  // game_url:yup.string().required('Game url cannot be blank'),
  // game_web_link:yup.string().required('Game web link cannot be blank'),
  // game_twitter_link:yup.string().required('cannot be blank'),
  // game_instagram_link:yup.string().required('cannot be blank'),
  // game_discord_link:yup.string().required('cannot be blank'),
})

export const assetValidationSchema = yup.object().shape({
  asset_name: yup.string().required('Name cannot be blank'),
  asset_description: yup.string().required('Description cannot be blank'),
  asset_supply: yup.string().required('Supply cannot be blank'),
})
