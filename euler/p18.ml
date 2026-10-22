


let read_file n path =
  let channel = open_in path in
  let grid = Array.make_matrix n n 0 in
  for i = 0 to n - 1 do
    let line = input_line channel in
    let () = List.iteri
      (fun j x -> grid.(i).(j) <- int_of_string x )
      (String.split_on_char ' ' line)
    in
    ()
  done;
  grid

let largest n path =
  let grid = read_file n path in
  let rec aux x y =
    (* Bon car tout est positif *)
    if x >= n || y >= n
    then 0
    else grid.(y).(x) + max (aux x (y + 1)) (aux (x + 1) (y + 1))
  in
  aux 0 0
