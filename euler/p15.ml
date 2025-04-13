
let solve n =
  let cache = Array.make_matrix (n + 1) (n + 1) 0 in
  let _ = cache.(n).(n) <- 1 in
  let rec aux x y =
    if cache.(x).(y) <> 0
    then cache.(x).(y)
    else
      let value = (if x < n then aux (x + 1) y else 0) + (if y < n then aux x (y + 1) else 0) in
      let _ = cache.(x).(y) <- value in
      value
  in
  aux 0 0
