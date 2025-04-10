
let somme n =
  let nombres = Array.make (n + 1) 0 in
  let s = ref 0 in
  for i = 2 to n do
    if nombres.(i) = 0
    then
      begin
        s := !s + i;
        for j = 1 to (n / i) do
          nombres.(i * j) <- 1
        done;
      end
  done;
  !s

