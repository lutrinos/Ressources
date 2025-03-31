

(* Solution également naïve - somme 999 *)
let rec somme n =
  if n > 0
    then
      (if n mod 5 = 0 || n mod 3 = 0 then n else 0) + somme (n - 1)
    else 0