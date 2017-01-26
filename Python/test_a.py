import re

def thousands_with_commas(i):
    # Check type :)
    if not isinstance(i, int):
        raise Exception('{} is not an integer'.format(i))

    # Convert to String and reverse it
    str_value = str(i)[::-1]

    # Splits the string 3 by 3
    split_by_three = re.split(r'(...)', str_value)

    # Filter empty strings
    split_by_three_filtered = list(filter(lambda x: len(x) > 0, split_by_three))

    # Final string (reversed)
    final_string = ','.join(split_by_three_filtered)[::-1]

    return str(final_string)


if __name__ == '__main__':
    assert thousands_with_commas(1234) == '1,234'
    assert thousands_with_commas(123456789) == '123,456,789'
    assert thousands_with_commas(12) == '12'
