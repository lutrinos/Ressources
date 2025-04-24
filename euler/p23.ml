
let somme n =
  let divisors = Array.make n 0 in
  let abundant = Array.make n 0 in
  (* On calcule les nombres abondants *)
  for i = 1 to n - 1 do
    if divisors.(i) > i then abundant.(i) <- 1;
    for j = 2 to (n - 1) / i do
      divisors.(i * j) <- divisors.(i * j) + i;
    done;
  done;
  (* On calcule la somme *)
  let somme = ref 0 in
  for i = 1 to n - 1 do
    let exists = ref false in
    for j = 12 to i do
      if abundant.(j) = 1 && abundant.(i - j) = 1
      then exists := true;
    done;
    if !exists = false then somme := !somme + i;
  done;
  !somme
