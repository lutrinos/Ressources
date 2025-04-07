let diff n =
  let a = ref 0 in
  let b = ref 0 in
  for i = 1 to n do
    a := !a + i*i;
    b := !b + i;
  done;
  let () = b := !b * !b in
  !b - !a
