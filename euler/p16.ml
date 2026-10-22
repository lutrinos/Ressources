
let somme n =
  let rec doublify u retenue =
    match u with
    | [] -> if retenue = 0 then [] else [retenue]
    | x::u' ->
        let unite = (2 * x + retenue) mod 10 in
        let dizaine = (2 * x + retenue - unite) / 10 in
        unite::(doublify u' dizaine)
  in
  let rec multiply i =
    match i with
    | 0 -> [1]
    | i -> doublify (multiply (i - 1)) 0
  in
  List.fold_left
    (fun a b -> a + b)
    0
    (multiply n)
