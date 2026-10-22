from time import sleep

def show(lines, count):
    string = ""
    for l in lines:
        string += ''.join(l) + '\n'
    print(string)
    print("Compte", count)

with open("day7.txt", "r") as f:
    lines = [list(line) for line in f.readlines()]

    timelines = [0] * len(lines[0])
    timelines[lines[0].index('S')] = 1

    lines[0] = [(c if c != 'S' else '|') for c in lines[0]]

    count = 0
    for i in range(len(lines) - 1):
        for j, c in enumerate(lines[i]):
            if c == '|' and lines[i+1][j] ==  '^':
                count += 1
                timelines[j+1] += timelines[j]
                timelines[j-1] += timelines[j]
                timelines[j] = 0
                lines[i+1][j-1] = '|'
                lines[i+1][j+1] = '|'
            elif c == '|':
                lines[i+1][j] = '|'

        show(lines, count)
        sleep(0.05)

    print("Timelines", sum(timelines))

    