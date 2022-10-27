input_file_path = '../source/json2html.js'
output_file_path = '../source/json2html.min.js'

with open(input_file_path, 'r') as file:
    code = file.read()
    code = ' '.join(code.replace('\n', '').split())

with open(output_file_path, 'w') as file:
    file.write(code)
