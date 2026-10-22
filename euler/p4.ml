
let rec digit n i = if i == 0 then n mod 10 else digit ((n - n mod 10) /10) (i - 1)

let is_palindrome n = digit n 0 == digit n 5 &&  digit n 1 == digit n 4 && digit n 2 == digit n 3

(* Affiche tous les palindromes *)
let get_palindrome n =
  let max = ref 0 in
  for i = n downto 1 do
    for j = i to n do
      if is_palindrome (i * j) && i * j >= !max
        then max := i * j;
    done
  done;
  Printf.printf "%d\n" !max