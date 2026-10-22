
let get_grid path =
  let grid = Array.make_matrix 20 20 0 in
  let channel = open_in path in
  for i = 0 to 19 do
    let line = input_line channel in
    List.iteri
      (fun j x -> grid.(i).(j) <- int_of_string x)
      (String.split_on_char ' ' line);
  done;
  grid

let largest path =
  let grid = get_grid path in
  let rec aux compute =
    let maximum = ref 0 in
    let v = ref 1 in
    for y = 0 to 15 do
      for x = 0 to 15 do
        v := 1;
        for k = 0 to 3 do
          let x', y' = compute x y k in
          v := !v * grid.(y').(x');
        done;
        maximum := max !maximum !v;
      done;
    done;
    !maximum
  in
  List.fold_left
    max
    0
    [
      aux (fun x y k -> (x + k, y));
      aux (fun x y k -> (x, y + k));
      aux (fun x y k -> (x + k, y + k));
      aux (fun x y k -> (x + k, y + 3 - k))
    ]
