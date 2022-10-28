input_file_path = '../source/json2html.js'
output_file_path = '../source/json2html.min.js'

with open(input_file_path, 'r') as file:

    lines = file.readlines()

    def has_starting_of_multiline_comment(string):
        if string.find('/*') == -1:
            return False
        return True

    def has_ending_of_multiline_comment(string):
        if string.find('*/') == -1:
            return False
        return True

    def has_single_line_comment(string):
        if string.find('//') == -1:
            return False
        return True

    dont_count = False

    for index, line in enumerate(lines):
        if has_starting_of_multiline_comment(lines[index]) and has_ending_of_multiline_comment(lines[index]):
            lines[index] = lines[index][:lines[index].find(
                '/*')]+lines[index][lines[index].find('*/')+2:]
        if has_starting_of_multiline_comment(lines[index]) and not has_ending_of_multiline_comment(lines[index]):
            lines[index] = lines[index][:lines[index].find('/*')]
            dont_count = True
        if not has_starting_of_multiline_comment(lines[index]) and has_ending_of_multiline_comment(lines[index]):
            lines[index] = lines[index][lines[index].find('*/')+2:]
            dont_count = False

        if dont_count:
            lines[index] = ''
        else:
            if has_single_line_comment(lines[index]):
                lines[index] = lines[index][:lines[index].find('//')]
    lines = ' '.join(''.join(lines).replace('\n', ' ').split())

with open(output_file_path, 'w') as file:
    file.write(lines)
