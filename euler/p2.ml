let somme n =
  let rec aux a b =
    if b > n
      then 0
      else (if b mod 2 = 0 then b else 0) + aux b (a + b)
  in
  aux 1 2