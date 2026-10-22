import math

class BrainFuck:

    def __init__(self, size: int, inputs: List[int]):
        self.array = [0] *size
        self.inputs = inputs
        self.pointer = 0
        self.inputs_index = 0

        self.output = ""
    
    def next(self, v: str):

        # Exécution
        if v == '>':
            self.pointer += 1
        elif v == '<':
            self.pointer -= 1
        elif v == '+':
            self.array[self.pointer] += 1
        elif v == '-':
            self.array[self.pointer] -= 1
        elif v == '.':
            self.output += chr(self.array[self.pointer])
        elif v == ',':
            self.array[self.pointer] = self.inputs[self.inputs_index]
            self.inputs_index += 1
        elif v == '[':
            if self.array[self.pointer] == 0:
                return math.inf
        elif v == ']':
            if self.array[self.pointer] != 0:
                return - math.inf
        
        # Vérifications
        if self.pointer < 0 or self.pointer >= len(self.array):
            raise Exception("POINTER OUT OF BOUNDS")
        elif self.array[self.pointer] < 0 or self.array[self.pointer] > 255:
            raise Exception("INCORRECT VALUE")
        
        return 1

    def run(self, code: str):
        blocs = []

        # Création des blocs
        level = 0
        pointers = dict()
        buffer = ""

        for i in range(len(code)):
            buffer += code[i]

            if code[i] == '[':
                pointers[level] = len(blocs)
                blocs.append([-1, buffer])
                buffer = ''
                level += 1
            elif code[i] == ']':

                if level > 0:
                    parent = pointers[level - 1]

                    blocs[parent][0] = len(blocs)
                    blocs.append([parent + 1, buffer])
                    buffer = ''
                    level -= 1
                else:
                    raise Exception("SYNTAX ERROR")
        
        blocs.append([level, buffer])
        
        if level != 0:
            raise Exception("SYNTAX ERROR")

        # Exécution
        bloc = 0

        self.output = ""
        self.array = [0 for i in self.array]
        self.pointer = 0
        self.inputs_index = 0

        while bloc < len(blocs):

            for index in range(0, len(blocs[bloc][1])):
                v = self.next(blocs[bloc][1][index])

                if v == math.inf:
                    bloc = blocs[bloc][0] - 1
                    break
                elif v == - math.inf:
                    bloc = blocs[bloc][0] - 1
                    break

            bloc += 1
        
        return self.output

hello_world = """++++++++
[
  >++++
  [
    >++>+++>+++>+<<<<-
  ]
  >+>+>->>+
  [
    <
  ]
  <-
]
>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.
"""

interpreter = BrainFuck(100, [])

print(interpreter.run(hello_world))