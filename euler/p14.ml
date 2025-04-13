
let longest until =
  let rec collatz n =
    match n with
    | 1 -> 0
    | n when n mod 2 = 0 -> 1 + collatz (n / 2)
    | n -> 1 + collatz (3 * n + 1)
  in
  let rec aux n =
    if n >= until
    then (0, 0)
    else
      begin
        let iterations = collatz n in
        let pmax, pmax_seed = aux (n + 1) in
        if iterations > pmax
        then (iterations, n)
        else (pmax, pmax_seed)
      end
  in
  aux 1
