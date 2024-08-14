import json

commands_json_path = 'commands.json'
tm_language_json_path = 'syntaxes/fst.tmLanguage.json'

def load_commands(commands_json_path):
    with open(commands_json_path, 'r', encoding='utf-8') as file:
        commands = json.load(file)
    return [command['name'] for command in commands]

def generate_tm_language(keywords):
    # sort by its length
    keywords = sorted(keywords, key=len, reverse=True)

    tm_language = {
        "scopeName": "source.fst",
        "patterns": [
            {
                "include": "#keywords"
            },
            {
                "include": "#variables"
            },
            {
                "include": "#strings"
            },
            {
                "include": "#line_comment"
            },
            {
                "include": "#event_and_command"
            },
            {
                "include": "#regexp"
            },
            {
                "include": "#numbers"
            },
            {
                "include": "#numbers_block"
            },
            {
                "include": "#files"
            },
            {
                "include": "#includes"
            }
        ],
        "repository": {
            "keywords": {
                "patterns": [{
                    "name": "constant.language.NULL.fst",
                    "match": "(\\<eps\\>)"
                }]
            },
            "variables": {
                "patterns": [{
                    "name": "variable.parameter.fst",
                    "match": "(\\$\\{.+?\\})"
                }]
            },
            "strings": {
                "name": "string.quoted.double.fst",
                "begin": "\"",
                "end": "\""
            },
            "line_comment": {
                "patterns": [
                    {
                        "begin": "(^[ \\t]+)?(?=#)",
                        "beginCaptures": {
                            "1": {
                                "name": "punctuation.whitespace.comment.leading.fst"
                            }
                        },
                        "end": "(?!\\G)",
                        "patterns": [
                            {
                                "begin": "#",
                                "beginCaptures": {
                                    "0": {
                                        "name": "punctuation.definition.comment.fst"
                                    }
                                },
                                "end": "\\n",
                                "name": "comment.line.number-sign.fst"
                            }
                        ]
                    }
                ]
            },
            "event_and_command": {
                "patterns": [
                    {
                        "match": f"({'|'.join(keywords)})",
                        "name": "entity.name.type.fst"
                    }
                ]
            },
            "regexp": {
                "patterns": [{
                    "name": "string.regexp.fst",
                    "match": "(@.*?@)"
                }]
            },
            "numbers": {
                "patterns": [
                    {
                        "match": "(^\\w+)\\s+(\\w+)\\s+",
                        "captures": {
                            "1": {
                                "name": "entity.name.function.definition.fst"
                            },
                            "2": {
                                "name": "entity.name.function.definition.fst"
                            }
                        }
                    }
                ]
            },
            "numbers_block": {
                "patterns": [
                    {
                        "match": "(^\\w+)\\s+(\\w+)?",
                        "captures": {
                            "1": {
                                "name": "entity.name.function.definition.fst"
                            },
                            "2": {
                                "name": "entity.name.function.definition.fst"
                            }
                        }
                    }
                ]
            },
            "files": {
                "patterns": [
                    {
                        "match": "\\|([^\\*\\?\\|]+\\.[A-Za-z][A-Za-z0-9]+)([ \\t\\|]|$)",
                        "captures": {
                            "1": {
                                "name": "string.unquoted.fst"
                            }
                        },
                        "include" : "#strings"
                    }
                ]
            },
            "includes": {
                "patterns": [
                    {
                        "match": "^\\s*(%INCLUDE)\\((\\S*)\\)",
                        "captures": {
                            "1": {
                                "name": "keyword.definition.fst"
                            },
                            "2": {
                                "name": "string.unquoted.fst"
                            }
                        }
                    }
                ]
            }
        },
        "name": "fst",
    }
    
    return tm_language

def save_tm_language(tm_language, tm_language_json_path):
    with open(tm_language_json_path, 'w', encoding='utf-8') as file:
        json.dump(tm_language, file, indent=4)

def main():
    keywords = load_commands(commands_json_path)

    tm_language = generate_tm_language(keywords)

    save_tm_language(tm_language, tm_language_json_path)

    print(f"Generated {tm_language_json_path} successfully.")

if __name__ == "__main__":
    main()
