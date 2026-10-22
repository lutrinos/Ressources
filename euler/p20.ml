
let somme n =
  let rec multiply u facteur retenue =
    match u with
    | [] when retenue = 0 -> []
    | [] -> (retenue mod 10)::(multiply [] facteur ((retenue - (retenue mod 10)) / 10))
    | x::u' ->
        let unite = (x * facteur + retenue) mod 10 in
        let reste = (x * facteur + retenue - unite) / 10 in
        unite::(multiply u' facteur reste)
  in
  let rec fac i =
    match i with
    | 0 -> [1]
    | i -> multiply (fac (i - 1)) i 0
  in
  List.fold_left
    (fun a b -> a + b)
    0
    (fac n)
