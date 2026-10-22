from math import floor, log10

with open("day2.txt", "r") as f:
    raw_ids = f.readline().split(",")
    ids = []

    for raw_id in raw_ids:
        if '-' in raw_id:
            segments = raw_id.split('-')
            ids.append((int(segments[0]), int(segments[1])))

    count = 0

    step = 0
    for first_id, last_id in ids:
        step += 1
        print("Step", step, "/", len(ids), "|", first_id, "-", last_id)
        for id in range(first_id, last_id + 1):

            for n in range(1, 2 + floor(log10(id))):
                power = pow(10, n)
                segment = id % power

                somme = segment + power * segment
                facteur = power

                if segment // pow(10, n - 1) == 0:
                    continue

                while somme < id:
                    facteur *= power
                    somme += segment * facteur
                
                if somme == id:
                    count += id
                    break

    print("Compte :", count)