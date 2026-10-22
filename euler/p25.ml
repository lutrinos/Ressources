
(* Division euclidienne *)
let euclidian a b =
  let r = a mod b in
  let q = (a - r) / b in
  (q, r)

(* Addition de u et v *)
let add u v =
  let rec aux u v retenue =
    match u, v with
    | x::u', y::v' ->
      let q, r = euclidian (x + y + retenue) 10 in
      r::(aux u' v' q)
    | [], x::u' | x::u', [] ->
      if retenue = 0
      then x::u'
      else begin
        let q, r = euclidian (x + retenue) 10 in
        r::(aux [] u' q)
      end
    | [], [] ->
      if retenue <> 0
      then begin
        let (q, r) = euclidian retenue 10 in
        r::(aux [] [] q)
      end else []
  in
  aux u v  0

let main () =
  let i = ref 2 in
  let a = ref [1] in
  let b = ref [1] in
  while List.length !b < 1000 do
    let b' = !b in
    b := add !a !b;
    a := b';
    incr i;
  done;
  !i