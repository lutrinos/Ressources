
(* Lecture d'un entier *)
let parse_string str =
  let rec aux i =
    match i with
    | 50 -> []
    | i -> (int_of_char str.[49 - i] - int_of_char '0')::(aux (i + 1))
  in
  aux 0

(* Affichage d'un entier *)
let affiche l =
  let rec aux u =
    match u with
    | [] -> ()
    | x::u' ->
        aux u';
        Printf.printf "%d" x
  in
  let () = aux l in
  Printf.printf "\n"

(* Addition d'entiers *)
let add a b =
  let rec aux u v retenue =
    match u, v with
    | [], [] ->
        if retenue = 0
        then []
        else [retenue]
    | x::w, [] | [], x::w ->
        let unite = (x + retenue) mod 10 in
        let dizaine = (x  + retenue - unite) / 10 in
        unite::(aux w [] dizaine)
    | x::u', y::v' ->
        let unite = (x + y + retenue) mod 10 in
        let dizaine = (x + y + retenue - unite) / 10 in
        unite::(aux u' v' dizaine)
  in
  aux a b 0
  
(* Lecture du fichier *)
let read_file path =
  let channel = open_in path in
  let numbers = Array.make 100 [] in
  for i = 0 to 99 do
    let line = input_line channel in
    numbers.(i) <- parse_string (String.trim line);
  done;
  numbers

let somme path =
  let numbers = read_file path in
  affiche (
    Array.fold_left
      (fun a b -> add a b)
      []
      numbers
  )
