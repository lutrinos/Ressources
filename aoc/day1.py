
count = 0
state = 50

with open("day1.txt", "r") as f:
    bucket = 0
    lines = [line for line in f.readlines()]

    for index, line in enumerate(lines):
        print("Step", index, "/", len(lines))
        direction = line[0]
        shift = int(line[1:])

        if direction == "R":
            bucket += shift
        elif direction == "L":
            bucket -= shift
        
        while bucket != 0:
            if bucket > 0:
                if state + bucket < 100:
                    state += bucket
                    bucket = 0
                else:
                    count += 1
                    state = (state + min(bucket, 100)) % 100
                    bucket = max(0, bucket - 100)
            else:
                if state + bucket > 0:
                    state += bucket
                    bucket = 0
                else:
                    count += 0 if state == 0 and abs(bucket) < 100 else 1
                    state = (state + max(bucket, -100)) % 100
                    bucket = min(bucket + 100, 0)

print("State :", state)
print("Count :", count)