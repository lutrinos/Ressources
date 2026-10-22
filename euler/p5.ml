let rec greatest n =
  let ok = ref true in
  for i = 2 to 20 do
    if n mod i <> 0 then ok := false
  done;
  if !ok then n else greatest (n + 10)
