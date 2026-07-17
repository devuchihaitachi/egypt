import os
import sys
import difflib

def generate_diff(backup_dir, workspace_dir, files, outfile):
    diff_content = []
    diff_content.append(f"# Review package (manual diff)\n\n")
    diff_content.append("## Files changed\n")
    for f in files:
        diff_content.append(f" - {f}\n")
    diff_content.append("\n## Diff\n")
    
    for f in files:
        # Resolve paths
        workspace_file = os.path.join(workspace_dir, f)
        backup_file = os.path.join(backup_dir, f)
        
        # Read workspace content
        if os.path.exists(workspace_file):
            with open(workspace_file, "r", encoding="utf-8", errors="ignore") as fh:
                w_lines = fh.readlines()
        else:
            w_lines = []
            
        # Read backup content
        if os.path.exists(backup_file):
            with open(backup_file, "r", encoding="utf-8", errors="ignore") as fh:
                b_lines = fh.readlines()
        else:
            b_lines = []
            
        # Generate unified diff
        diff = difflib.unified_diff(
            b_lines, w_lines, 
            fromfile=f"a/{f}", tofile=f"b/{f}", 
            lineterm=""
        )
        
        diff_str = "\n".join(list(diff))
        if diff_str:
            diff_content.append(f"### {f}\n```diff\n{diff_str}\n```\n\n")
        else:
            diff_content.append(f"### {f} (No changes or newly created empty file)\n\n")

    # Ensure parent dir exists
    os.makedirs(os.path.dirname(outfile), exist_ok=True)
    with open(outfile, "w", encoding="utf-8") as out_fh:
        out_fh.write("".join(diff_content))
    
    print(f"Wrote diff package to: {outfile}")

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python sdd-diff.py BACKUP_DIR WORKSPACE_DIR OUTFILE FILE1 [FILE2 ...]")
        sys.exit(1)
        
    b_dir = sys.argv[1]
    w_dir = sys.argv[2]
    out_file = sys.argv[3]
    files_list = sys.argv[4:]
    
    generate_diff(b_dir, w_dir, files_list, out_file)
