--g :: Bool
--g = g
--f :: Bool -> Bool -> Bool 
--f a b = if a then a else b
--main = print( f True g)
--
--
--

data Arith = Numbr Integer
           | Add Arith Arith
               deriving Show

data List a = Nil
            | Cons a (List a)
                deriving Show

e1 :: Arith
e1 = Add (Numbr 1) (Numbr 1)

main = print e1

append :: List a -> List a -> List a
append Nil l = l
append (Cons h t) l = Cons h (append t l)

allnums :: Arith -> List Integer
allnums (Numbr i) = Cons i Nil
allnums (Add n n') = append (allnums n) (allnums n')

eval :: Arith -> Arith
eval (Numbr i) = Numbr i
eval (Add a b)
  = let a' = eval a in
      let b' = eval b in
        case (a', b') of
            (Numbr a', Numbr b') -> Numbr (a' + b')



f :: Bool -> Bool -> Bool
f x y = x 
g = f True
