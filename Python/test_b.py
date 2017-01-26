import re

def annograms(word):
    words = [w.rstrip() for w in open('WORD.LST')]

    # Get same length words
    words = list(filter(lambda x: len(x) == len(word), words))

    # Check for each letter in word with regex
    regex_pattern_list = ['(?!.*{}.*{})'.format(s, s) for s in list(word)]
    regex_pattern_str = ''.join(regex_pattern_list)
    regex_pattern = '^{}[{}]*$'.format(regex_pattern_str, word)
    pattern = re.compile(r'{}'.format(regex_pattern))

    # Get matches for the regex
    annograms = [i for i in words if pattern.match(i)]

    # Return list of results
    return annograms


if __name__ == "__main__":
    print(annograms("train"))
    print('--')
    print(annograms('drive'))
    print('--')
    print(annograms('python'))
