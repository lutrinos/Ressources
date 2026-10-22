
let factors n =
  let rec aux i =
    match i * i with
    | x when x = n -> 1
    | x when x > n -> 0
    | x ->
        if n mod i = 0
          then 2 + aux (i + 1)
          else aux (i + 1)
  in
  aux 1

let largest divisors =
  let rec aux n i =
    match factors n with
    | x when x > divisors -> n
    | _ -> aux (n + i) (i + 1)
  in
  aux 0 1
