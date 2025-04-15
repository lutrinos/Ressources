
let count () =
  let n = [| 31; 28; 31; 30; 31; 30; 31; 31; 30; 31; 30; 31 |] in
  let compte = ref 0 in
  let day_of_the_week = ref 1 in
  for year = 1901 to 2000 do
    for month = 1 to 12 do
      let nb_days = (if year mod 4 = 0 && month = 2 then 29 else n.(month - 1)) in
      for day = 1 to nb_days do
        compte := !compte + (if !day_of_the_week = 6 && day = 1 then 1 else 0);
        day_of_the_week := (!day_of_the_week + 1) mod 7;
      done;
    done;
  done;
  !compte
