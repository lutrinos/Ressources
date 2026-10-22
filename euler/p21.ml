
let amicable () =
  let n = 10000 in
  let cache = Array.make (n * 30) 0 in
  let rec count i =
    match i with
    | 0 -> 0
    | x -> count (i - 1 ) + (if cache.(i) <> i && cache.(cache.(i)) = i then i else 0)
  in
  let rec fill number factor =
    match number * factor with
    | x when x >= n * 30 -> if number < n then fill (number + 1) 2 else ()
    | x ->
        let () = cache.(x) <- cache.(x) + number in
        fill number (factor + 1)
  in
  let () = fill 1 2 in
  count (n - 1)
