
let square n = int_of_float (floor (sqrt (float_of_int n)))

let diviseur n =
  let rec aux n i stop =
    if n mod i = 0 && (stop || 1 = aux i (square i) true)
      then i
      else aux n (i - 1) stop
  in
  aux n (square n) false