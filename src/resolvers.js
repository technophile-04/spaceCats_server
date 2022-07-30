const resolvers = {
	Query: {
		// Gets a lists of tacks for home page
		tracksForHome: (_, __, { dataSources }, info) => {
			return dataSources.trackAPI.getTracksForHome();
		},
		// get a single track by ID, for the track page
		track: (_, { id }, { dataSources }) => {
			return dataSources.trackAPI.getTrack(id);
		},
		// get a single module
		module: (_, { id }, { dataSources }) => {
			return dataSources.trackAPI.getModule(id);
		},
	},

	Mutation: {
		incrementTrackViews: async (_, { id }, { dataSources }) => {
			try {
				const track = await dataSources.trackAPI.incrementTrackViews(id);
				return {
					code: 200,
					success: true,
					message: `Successfully incremented number of views for track ${id}`,
					track,
				};
			} catch (err) {
				return {
					code: err.extensions.response.status,
					success: false,
					message: err.extensions.response.body,
					track: null,
				};
			}
		},
	},

	Track: {
		author: ({ authorId }, _, { dataSources }) => {
			return dataSources.trackAPI.getAuthor(authorId);
		},
		modules: ({ id }, _, { dataSources }) => {
			return dataSources.trackAPI.getTrackModules(id);
		},
	},
};

module.exports = resolvers;
