import os
import re

from gql import gql


def load_gql(file_path):
    return gql(read_gql_file(file_path))


def read_gql_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Get the directory of the current .gql file
    dir_path = os.path.dirname(file_path)

    # Regex pattern for #import
    import_pattern = re.compile(r"#import \"(.*?)\"")

    # Replace all imports with their respective file contents
    while match := import_pattern.search(content):
        relative_fragment_path = match.group(1)
        # Join the directory of the current file with the relative path of the fragment
        absolute_fragment_path = os.path.join(dir_path, relative_fragment_path)
        fragment_content = read_gql_file(absolute_fragment_path)

        # Replace import statement with file content
        content = content.replace(match.group(0), fragment_content, 1)

    return content
