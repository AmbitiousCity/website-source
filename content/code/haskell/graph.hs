-- first attempt to define some graph modeling using Haskell
import Data.List

--this concerns graphs, not music
data NodeType = 
	InputNode | QuestionNode | OutputNode
	deriving (Show, Enum, Eq)

-- a Node that points into a Question
data InputNode =
	Observation | Source
	deriving (Show, Enum, Eq)

--the main Node; the center of the graph
data QuestionNode =
	Question --the main node type
	deriving (Show, Enum, Eq)

--a Node that points from a Question
data OutputNode =
	Option --there'll be more types later
	deriving (Show, Enum, Eq)

--not sure what the link types are yet
data LinkType =
	Normal | Other
	deriving (Show, Enum, Eq)

--edges, or links between nodes
data Link = Link { 
	source :: Node, 
	target :: Node,
	linkMeaning :: String,
	linkType :: LinkType
	} 
	deriving Show

--node in a d3 json graph
data Node = Node {
	title :: String,
	slug :: String,
	category :: NodeType,
	tags :: [String],
	hasArticle :: Bool
	} 
	deriving Show

--Permissible link types:
--InputNode -> QuestionNode
--QuestionNode -> OutputNode


--all chromatic notes
data Note = C | Df | D | Ef | E | F | Gf | G | Af | A | Bf | B
	deriving (Show, Enum, Eq)

getNote :: Int -> Note
getNote i
	| i<0 || i>11 = error "Out of range"
	| otherwise = toEnum i

getNoteIndex :: Note -> Int
getNoteIndex n = fromEnum n

--all chromatic intervals (within one octave)
data Intv = P1 | MIN2 | MAJ2 | MIN3 | MAJ3 | P4 | DIM5 | P5 | MIN6 | MAJ6 | MIN7 | MAJ7 | P8
	deriving (Show, Enum, Eq)

getIntv :: Int -> Intv
getIntv i 
	| i<0 || i>12 = error "Out of range"
	| otherwise = toEnum i

getIntvIndex :: Intv -> Int
getIntvIndex intv = fromEnum intv

--infinite list of all notes (beginning at C)
notesInf = cycle [C .. B]--numbers that correspond to the notes on a piano (infinite list)

repeat_ :: Int -> Int -> Int -> [Int]
repeat_ n r counter -- n: num times to repeat; r: num to repeat; counter: repeats printed
	| r>12 = []
	| counter==(n-1) = r : repeat_ n (r+1) 0 --at the end go to the next number
	| otherwise = r : repeat_ n r (counter+1) --repeat current number

--example
gChromatic :: [Note]
gChromatic = take 12 (drop 7 notesInf)

--all 88 notes of a grand piano (starting at A0; ends at C8)
gpNotes :: [Note]
gpNotes = take 88 (drop 9 notesInf)

pianoNums :: [Int]
pianoNums = take 88 (drop 9 (repeat_ 12 0 0))

--starts at A0
gpNotesTuples = zip gpNotes pianoNums

--gets a 12 note chromatic scale starting on any Note
getChromatic :: Note -> [Note]
getChromatic n = take 12 (drop i notesInf) 
	where i = fromEnum n --see getNoteIndex above

--makes a list of pairs: (noteLetters x noteNumbers)
--notes = zip noteLetters noteNums

--makes an infinite list of note separated by fifths
--fifths = take 12 (drop 7 noteStrings)

--takes every nth element of a list and returns a new l-length list
every :: Int -> Int -> [a] -> [a]
every _ 0 _  = []
every _ _ [] = []
every n length xs = 
		head xs : every n (length-1) (drop n xs)

--circle of fifths
circ5 :: [Note]
circ5 = every 7 12 notesInf
--circ5n = every 7 12 noteNumsInf

--circle of fourths
circ4 :: [Note]
circ4 = every 5 12 notesInf
--circ4n = every 5 12 noteNumsInf

--intervals that define scales
intv_maj :: [Int]
intv_maj = [2, 2, 1, 2, 2, 2, 1] --major scale

intv_natMin :: [Int]
intv_natMin = [2, 1, 2, 2, 1, 2, 2] --natural minor scale

intv_majPent :: [Int]
intv_majPent = [2, 2, 3, 2, 3] --major pentatonic

intv_minPent :: [Int]
intv_minPent = [3, 2, 2, 3, 2] --minor pentatonic

--constructs [any] scale given a tonic note, a chromatic list & an interval list [that defines the scale]
scale :: Note -> [Note] -> [Int] -> [Note]
scale _ _ [] = [] --if at the end of the interval list, you're done
scale t (c:cs) (i:is) = c : scale t (drop (i-1) cs) is

--sample usage of above function
--majG_scale = scale G (getChromatic G) intv_maj
--majG_scale = scale G (getChromatic G) intv_maj
--majC_scale = scale C (getChromatic C) intv_maj

majScale :: Note -> [Note]
majScale t = scale t (getChromatic t) intv_maj
minScale :: Note -> [Note]
minScale t = scale t (getChromatic t) intv_natMin

--takes a Note and returns it related natural minor (Cmaj -> Amin)
--relatedMinor :: Note -> [Note]
--relatedMinor t = scale n (getChromatic n) intv_natMin 
--	where n = fromEnum t

--Intervals : semitones between two Notes (note the wrapper function structure)
intv :: Note -> Note -> Int
intv n1 n2 = intv_int n1 n2 (getChromatic n1) 0
	where
	intv_int :: Note -> Note -> [Note] -> Int -> Int
	intv_int n1 n2 (c:cs) index
		| n2==c = index --at the destination note, return the index
		| otherwise = intv_int n1 n2 cs index+1

--sample usage of above function
--intvCC = intv_int C C (getChromatic C) 0
--intvCG = intv_int C G (getChromatic C) 0



