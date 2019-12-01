app.post('/authors/:id/books', async (req, res) => {
	// TODO: implementați funcția care adauga o carte la un autor
	let author = Author.findOne({where:{id:req.params.id}})
		.then(result=> {
			if(result){
				Book.create({
					title: req.body.title,
					pages: req.body.pages,
					authorId: req.params.id
				});
				res.status(201).json({message: 'created'});
			}
			else {
					res.status(404).json({message : 'not found'})
			}
		}).catch(err=>{
	    		  res.status(500).send({message: `Error on todo insertion: ${err}`});	
	});
})


app.get('/authors/:id/books', async (req, res) => {
	// TODO: implementați funcția ce listeaza toate cartile unui autor
	try{
			let author = await Author.findOne({where:{id:req.params.id}})
	   	if(author){
	   		let books = await Book.findAll({where:{authorId:req.params.id}})
	   		res.status(200).json(books)
	   	}
	   	else {
	   		res.status(404).json({message : 'not found'})
	   	}
	}catch(err){
		 res.status(500).send({message: `Error on todo list: ${err}`});
	}

})
