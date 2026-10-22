
# Useless
def bin_search(arr, id):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        value = arr[mid][0]

        if arr[mid][0] <= id <=  arr[mid][1]:
            return True
        
        if value < id:
            left = mid + 1
        else:
            right = mid - 1
    
    return False

with open("day5.txt", "r") as f:
    intervals = []
    maximum = 0
    minimum = 1 << 10

    print("Lecture des ingrédients frais")
    index = 0

    lines = f.readlines()

    while index < len(lines):
        line = lines[index].strip()
        print("Intervalle %d" % index, end='\r')
        index += 1

        #line = f.readline().strip()

        if len(line) == 0:
            break

        limits = line.split('-')
        intervals.append((int(limits[0]), int(limits[1])))

        minimum = min(minimum, int(limits[0]))
        maximum = max(maximum, int(limits[1]))
    
    intervals.sort()

    count = 0
    intervals2 = []

    latest  = 0
    for i in intervals:
        start = i[0]
        end = i[1]

        if start <= latest:
            continue

        old_end = end
        while True:
            for j in intervals:
                if j[0] <= end:
                    end = max(end, j[1])
            
            if old_end == end:
                break
            old_end  = end
        
        intervals2.append((start, end))
        latest = end
    
    count = 0
    print(intervals2)
    for i in intervals2:
        count += i[1]- i[0] + 1
    
    print("Compte", count)

    """
    print("Lecture des ingrédients disponibles")
    count = 0
    for index, line in enumerate(f.readlines()):
        print("Ingrédient %d" % index, end='\r')

        id = int(line)
        for i in intervals:
            if i[0] <= id <=i[1]:
                count += 1
                break
    
    print()
    print("Compte %d" % count)
    """
    