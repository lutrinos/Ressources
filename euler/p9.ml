
let triplet n =
  for a = 1 to n do
    for b = 1 to n do
      let c = n - a - b in
      if a*a + b*b = c*c then Printf.printf "%d\n" (a*b*c)
    done;
  done;
  ()
