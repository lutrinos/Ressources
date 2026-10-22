let nth_prime n =
  let primes = Array.make n 0 in
  let _ = primes.(0) <- 2 in
  let len = ref 1 in
  let p = ref 3 in
  while !len <> n do
    let is_prime = ref true in
    for i = 0 to !len - 1 do
      if !p mod primes.(i) = 0 then is_prime := false
    done;
    if !is_prime then
      (
        let _ = primes.(!len) <- !p in
        len := !len + 1;
      );
    p := !p + 1;
  done;
  primes.(n - 1)
