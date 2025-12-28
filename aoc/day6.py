
def compute(lines: list[str]):
    numbers = []
    batch = []

    for i in range(len(lines[0])):
        n = ''

        for line in lines:
            #print(i, '-', line)
            if line[i].isdigit():
                n += line[i]
        
        if len(n) > 0:
            batch.append(int(n))
        else:
            numbers.append(batch)
            batch = []

    if len(batch) > 0:
        numbers.append(batch)
    return numbers

with open("day6.txt", "r") as f:
    raw_lines = f.readlines()
    operations = raw_lines.pop().split()
    problems = compute(raw_lines)

    somme = 0

    for index, operation in enumerate(operations):
        value = 1 if operation == '*' else 0

        for n in problems[index]:
            value = (value * n) if operation == '*' else (value + n)
        
        somme +=  value

    print("Somme", somme)