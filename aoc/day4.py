import time

with open("day4.txt", "r") as f:
    grid = [list(line.strip()) for line in f.readlines()]

    count = 0

    index = 0
    while True:
        index += 1

        old_count = count

        for y in range(len(grid)):
            for x in range(len(grid[y])):
                if grid[y][x] != '@':
                    continue

                adjacent = 0

                positions = []
                if x > 0:
                    positions.append((x-1, y))
                    if y > 0: positions.append((x-1, y-1))
                    if y < len(grid) - 1: positions.append((x-1, y+1))
                if x < len(grid[y]) - 1:
                    positions.append((x+1, y))
                    if y > 0: positions.append((x+1, y-1))
                    if y < len(grid) - 1: positions.append((x+1, y+1))
                if y > 0: positions.append((x, y-1))
                if y < len(grid) - 1: positions.append((x, y+1))

                for x2, y2 in positions:
                    if grid[y2][x2] == '@':
                        adjacent += 1
                
                if adjacent < 4:
                    grid[y][x] = '.'
                    count += 1
        
        for line in grid:
            print("".join(line))
        print("Iteration", index)
        time.sleep(0.05)
        
        if count == old_count:
            break

    for line in grid:
        print("".join(line))
    print("Compte", count)