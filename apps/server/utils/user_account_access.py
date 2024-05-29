import random
import string


def generate_random_string(length=8):
    if length < 8:
        raise ValueError("Length must be at least 8 characters.")

    # Define the character sets
    uppercase_letters = string.ascii_uppercase
    lowercase_letters = string.ascii_lowercase
    digits = string.digits
    special_characters = "!@#$%&*"

    # Ensure the random string contains at least one uppercase letter, one number, and one special character
    random_string = [
        random.choice(uppercase_letters),
        random.choice(digits),
        random.choice(special_characters),
    ]

    # Fill the rest of the string length with a combination of allowed characters
    allowed_characters = lowercase_letters + uppercase_letters + digits + special_characters
    random_string += random.choices(allowed_characters, k=length - 3)

    # Shuffle the resulting list to ensure randomness
    random.shuffle(random_string)

    # Join the list into a single string
    random_string = ''.join(random_string)

    # Check if any forbidden characters are in the string and regenerate if necessary
    forbidden_characters = set('?.,`\\[]<>+:;"^()')
    while any(char in forbidden_characters for char in random_string):
        random_string = ''.join(random.choices(allowed_characters, k=length))
        random_string += random.choice(uppercase_letters)
        random_string += random.choice(digits)
        random_string += random.choice(special_characters)
        random.shuffle(list(random_string))
        random_string = ''.join(random_string[:length])

    return random_string


def convert_user_access_to_list(user_account_access):
    result = []
    for row in user_account_access:
        result.append({
            'id': row[0],
            'account_id': row[1],
            'assigned_user_id': row[2],
            'assigned_account_id': row[3],
            'created_by': row[4],
            'created_on': row[5].isoformat(),
            'assigned_user_email': row[6],
            'assigned_user_name': row[7],
            'created_by_email': row[8],
            'created_by_name': row[9]
        })
    return result


def shared_user_access_to_list(shared_user_access):
    result_dict = [
            {
                "id": str(row[0]),
                "account_id": str(row[1]),
                "created_by": str(row[2]),
                "created_on": row[3].isoformat(),
                "assigned_account_name": row[4],
                "created_by_email": row[5],
                "created_by_name": row[6],
            }
            for row in shared_user_access
        ]
    return result_dict
