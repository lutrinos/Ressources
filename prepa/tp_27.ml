
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

(* Dodu apprenti sorcier *)
let decompte n =

	(* Compte le nombre de chiffres dans un entier *)
	let rec chiffres n =
		if n = 0
		then 0
			else 1 + chiffres ((n - (n mod 10)) / 10)
	in

	(* Sépare les p derniers chiffres de n *)
	let rec separe n p =
		if p = 0
		then (n, 0)
		else
			let r = n mod 10 in
			let a, b = separe ((n - r) / 10) (p - 1) in
			(a, b * 10 + r)
	in

	(* Applique une transformation à la liste u *)
	let rec transformation u =
		match u  with
		| [] -> []
		| a::v ->
			if chiffres a mod 2 = 1
			then (a * 2025)::(transformation v)
			else
				let a, b = separe a (chiffres a) in
				a::b::(transformation v)
	in

	(* Fonction auxiliaire *)
	let rec aux n =
		match n with
		| 0 -> 861::42::0::1::[]
		| n -> transformation (aux (n - 1))
	in
	aux n

(* Multiplication enchaînée de matrices *)
let multiplication u =

	(* Retourne un couple opérations * colonnes *)
	let rec aux v =
		match u with
		| [] -> (0, 0)
		| x::[] -> (0, 0)
		| x::y::[] -> (0, 34)
		| x::y::z::v ->
			let op1, 
	in
	aux u