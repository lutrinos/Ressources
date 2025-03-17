
(* Chemins dans le plan *)
let paths_naive n =
    let rec aux x y =
        if x = 0 && y = 0
            then 1
        else
            begin
                (if x > 0 then aux (x - 1) y  else 0)
                + (if y > 0 then aux x (y - 1) else 0)
                + (if x > 0 && y > 0 then aux (x - 1) (y - 1) else 0)
            end
    in
    aux (n - 1) (n - 1)