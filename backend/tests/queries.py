GET_SESSION = """
query ($id: ID!) {
    session(id: $id) {
      name
      messages {
        id
        content {... on Text {text} ... on Rating {rating}}
        timestamp {
          timestamp
        }
      }
    }
  }
"""

CREATE_SESSION = """
mutation ($name: String!) {
    session: createSession(name: $name) {
      id, name
    }
  }
"""

WATCH_SESSION = """
subscription ($id: ID!) {
    message: watchSession(id: $id) {
      id
      content {... on Text {text} ... on Rating {rating}}
      timestamp {
        timestamp
      }
    }
  }
"""
