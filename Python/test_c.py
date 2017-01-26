def sheep_count(n, i=1, digits=set()):
    if n == 0 or not isinstance(n, int):
        return 'INSOMNIA'

    n_digits = set(str(n * i))
    digits = digits.union(n_digits)

    if len(digits) == 10:
        return n * i

    i += 1
    return sheep_count(n=n, i=i, digits=digits)

if __name__ == "__main__":
    print(sheep_count(5))
    print('--')
    print(sheep_count(0))
    print('--')
    print(sheep_count(1))
    print('--')
    print(sheep_count(2))
    print('--')
    print(sheep_count(11))
    print('--')
    print(sheep_count(1692))
    print('--')
