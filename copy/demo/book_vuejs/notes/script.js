let notebook = new Vue({
  el: "#notebook",
  data(){
    return {
      notes: JSON.parse(localStorage.getItem("markdown_notes")) || [],
      selected_id: localStorage.getItem("markdown_selected_id") || null
    }
  },
  computed: {
    note_preview(){
      return this.get_selected_note ? marked(this.get_selected_note.content) : "";
    },
    get_selected_note(){
      let note = this.notes.find(
        (note) => {
          return note.id === this.selected_id;
        }
      );
      return note;
    },
    sorted_notes(){
      let notes = this.notes.slice();
      return notes.
        sort((a, b) => {return a.created_time - b.created_time}).
        sort((a, b) => {
          if(a.favorite === b.favorite){
            return 0;
          }
          else{
            return a.favorite ? -1 : 1;
          }
        })
    },
    line_count(){
      return this.get_selected_note.content.split(/\r\n|\r|\n/).length;
    },
    words_count(){
      if(this.get_selected_note){
        let content = this.get_selected_note.content;
        let s = content.replace(/\n/g, ' ');
        s = s.replace(/(^\s*)|(\s*$)/gi, ' ');
        s = s.replace(/[ ]{2,}/gi, ' ');
        return s.split(' ').length - 2;
      }
    },
    charaters_count(){
      if(this.get_selected_note){
        return this.get_selected_note.content.split("").length;
      }
    }
  },
  methods: {
    save_note(new_val, old_val){
      localStorage.setItem("markdown_content", new_val);
    },
    add_note(){
      const created_time = Date.now();
      const note = {
        id: String(created_time),
        title: `New Note ${this.notes.length + 1}`,
        content: "This is a new note, write something",
        created_time: created_time,
        favorite: false
      };
      this.notes.push(note);
    },
    select_note(note){
      this.selected_id = note.id;
    },
    save_notes(){
      localStorage.setItem("markdown_notes", JSON.stringify(this.notes));
    },
    remove_note(){
      if (this.get_selected_note && confirm("Delete the note ?")){
        const index = this.notes.indexOf(this.get_selected_note);
        if (index !== -1){
          this.notes.splice(index, 1);  
        }
      }
    },
    favorite_note(){
      let favorite = this.get_selected_note.favorite
      this.get_selected_note.favorite = !favorite;
    }
  },
  watch: {
    notes: {
      handler: "save_notes",
      deep: true
    },
    selected_id(new_val){
      localStorage.setItem("markdown_selected_id", new_val);
    }
  },
  created(){
    // this.content = localStorage.getItem("markdown_content");
  }
})

