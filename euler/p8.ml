
let greatest s n =
  let m = ref 0 in
  let subsequence start =
    let v = ref 1 in
    for i = 0 to n - 1 do
      v := !v * (int_of_char s.[start + i] - 48)
    done;
    !v
  in
  for i = 0 to String.length s - n do
    m := max !m (subsequence i);
  done;
  !m


