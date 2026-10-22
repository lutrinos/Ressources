
let compute_score name =
  let score = ref 0 in
  for i = 0 to String.length name - 1 do
    score := !score + int_of_char name.[i] + 1 - int_of_char 'A';
  done;
  !score

let read_file path =
  let channel = open_in path in
  let text = input_line channel in
  let names = List.filter
    (fun a -> a <> "" && a <> "," )
    (String.split_on_char '"' text)
  in
  List.sort String.compare names

let total_score path =
  let names = read_file path in
  let rec aux u i =
    match u with
    | [] -> 0
    | x::u' -> i * (compute_score x) + aux u'(i + 1)
  in
  aux names 1
