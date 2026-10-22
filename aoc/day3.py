
def compute(rating: list[int], length: int):
    if len(rating) == length:
        return rating
    
    volt = compute(rating[1:], length)
    value = rating[0]
    
    for i in range(len(volt)):
        if value >= volt[i]:
            temp = volt[i]
            volt[i] = value
            value = temp
        else:
            break
    return volt

with open("day3.txt", "r") as f:
    voltage = 0
    length = 12
    ratings = [[int(c) for c in s.strip()] for s in f.readlines()]

    for index, rating in enumerate(ratings):
        print("Step", index, "/", len(ratings))
        volt = compute(rating, length)
        voltage += sum(volt[i] * pow(10, length - i - 1) for i in range(length))

    print("Voltage :", voltage)