
let somme n =
  let unites = [| 0; 3; 3; 5; 4; 4; 3; 5; 5; 4|] in
  let dizaines = [| 0; 3; 6; 6; 6; 5; 5; 7; 6; 6 |] in
  let milliers = [| 0; 11 |] in
  let sadique = [| 3; 6; 6; 8; 8; 7; 7; 9; 8; 8 |] in
  let chars n =
    let unite = n mod 10 in
    let dizaine = ((n - unite) / 10) mod 10 in
    let centaine = ((n - (n mod 100)) / 100) mod 10 in
    let millier = ((n - (n mod 1000)) / 1000) mod 10 in
    (* Calcul *)
    milliers.(millier)(*  Millier *)
    + (if centaine <> 0 then unites.(centaine) + 7  else 0)(* Centaine *)
    + (if centaine <> 0 && (dizaine <> 0 || unite <> 0) then 3 else 0)(* And *)
    + (if dizaine = 1 then sadique.(dizaine) else 0)(* Dizaine *)
    + (if dizaine <> 1 then dizaines.(dizaine) + unites.(unite) else 0)(* Unité *)
  in
  let s = ref 0 in
  for i = 1 to n do
    s := !s + chars i;
  done;
  !s
