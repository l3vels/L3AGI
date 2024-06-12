import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useContext } from 'react';
import { Resource } from 'types/resource';
import { useModal } from 'hooks';
import { Template } from 'types/template';
import { useCreatePodService } from 'services/pod/usePodService'
import { useNavigate } from 'react-router-dom';
import { ToastContext } from 'contexts';
const podValidationSchema = yup.object().shape({
    pod_name: yup.string()
})

export interface PlanCard {
    id: number
    title: string;
    sub_title?: string;
    price: number;
    total_price?: number;
    default_total_price?: number;
    description?: string;
    per_mont?: boolean
    default_price: number
    field: string
}



const defaultPlan = (price: number, default_price: number) => ({
    id: 0,
    title: 'On-Demand',
    sub_title: 'Non-Interruptible',
    price: price,
    description: 'Pay as you go, with costs based on actual usage time.',
    default_price: default_price,
    field: 'secure_price',
})

const useDetails = (resource: Resource) => {
    const { closeModal, openModal } = useModal()
    const { setToast } = useContext(ToastContext)
    const navigate = useNavigate()
    const { createPod, loading: create_pod_loading } = useCreatePodService()

    const formik = useFormik({
        initialValues: { pod_name: '', max_gpu: 1, },
        onSubmit: values => handleSubmit(values),
        validationSchema: podValidationSchema,
    })
    const [selectedPlan, setSelectedPlan] = React.useState<PlanCard>(defaultPlan(resource.secure_price, resource.secure_price))
    const [selectedTemplate, setSelectTemplate] = React.useState<Template | null>(null)

    async function handleSubmit (values: { pod_name: string, max_gpu: number }) {
        const data = {
            pod_name: values.pod_name,
            price: 1,
            status: "running",
            provider: "AWS",
            category: "High Performance",
            type: resource.type,
            resource: resource.id,
            gpu_count: values.max_gpu,
            template: selectedTemplate?.id,
            isinstance_pricing: {
                plan: selectedPlan.field
            },
        }

        const result = await createPod(data)

        if(result) {
            setToast({
                message: result.message,
                type: result.success ? 'positive' : 'warning',
                open: true,
            })

            if(result.success) {
                navigate(`/pods`)
            }
        }

    }
    
    const createPlanCards = (
            resource: Pick<Resource, 'one_month_price' | 'three_month_price' | 'six_month_price' | 'secure_price'>
        ): PlanCard[] => {
        const plans = [
            { title: '1 Month Savings Plan', price: resource.one_month_price, months: 1, per_mont: true, field: 'one_month_price' },
            { title: '3 Month Savings Plan', price: resource.three_month_price, months: 3, per_mont: true, field: 'three_month_price' },
            { title: '6 Month Savings Plan', price: resource.six_month_price, months: 6, per_mont: true, field: 'six_month_price' },
        ];
    
        const plan_list: PlanCard[] = [defaultPlan(resource.secure_price * formik.values.max_gpu, resource.secure_price)];
    
        plans.forEach((plan, index) => {
            if (plan.price) {
                plan_list.push({
                    id: index + 1,
                    title: plan.title,
                    price: plan.price * formik.values.max_gpu,
                    default_price: plan.price,
                    total_price: (plan.months * 30 * 24 * plan.price) * formik.values.max_gpu,
                    default_total_price: (plan.months * 30 * 24 * plan.price),
                    description: `Reserve a GPU for ${plan.months} month${plan.months > 1 ? 's' : ''} at a discounted hourly cost.`,
                    per_mont: plan.per_mont,
                    field: plan.field
                });
            }
        });
    
        return plan_list;
    }

    const handleSelectPlan = (plan: PlanCard) => {
        setSelectedPlan(plan)
    }

    const handleSelectTemplate = (template: Template) => {
        setSelectTemplate(template)
        closeModal('change-pod-template-modal')
    }

    const handleOpenChangeTemplateModal = () => {
        openModal({ name: 'change-pod-template-modal', data: { handleSelectTemplate } })
    }
  
    return {
        formik,
        plan_cards: createPlanCards(resource),
        handleSelectPlan,
        selectedPlan,
        handleOpenChangeTemplateModal,
        selectedTemplate,
        create_pod_loading
    }
}


export default useDetails