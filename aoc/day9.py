
def parse_line(line: str):
    a = line.split(',')
    return (int(a[0]), int(a[1]))

with open("day9.txt", "r") as f:
    tiles = [parse_line(line) for line in f.readlines()]

    maximum = 1

    for i in range(len(tiles)):
        print("Step", i)
        for j in range(i):
            dx = abs(tiles[i][0] - tiles[j][0]) + 1
            dy = abs(tiles[i][1] - tiles[j][1]) + 1

            lx = min(tiles[i][0], tiles[j][0])
            ty = min(tiles[i][1], tiles[j][1])

            ok = True
            for k in range(len(tiles)):
                x, y = tiles[k]
                if lx < x < lx + dx - 1 and ty < y < ty + dy - 1:
                    ok = False
                    #if dx * dy == 24:
                    #    print("error", dx * dy, lx, ty, x, y)
                    break
            
            if ok:
                print("set", dx * dy, (lx, ty), (dx, dy))
                maximum = max(maximum, dx * dy)
    
    print("Maximum", maximum)