//package com.CouponSystem.Service;
//
//
//import javax.ws.rs.ext.ContextResolver;
//import javax.ws.rs.ext.Provider;
// 
//import com.fasterxml.jackson.annotation.JsonInclude.Include;
//import com.fasterxml.jackson.databind.MapperFeature;
//import com.fasterxml.jackson.databind.ObjectMapper;
// 
//
// 
//@Provider
////@Produces({MediaType.APPLICATION_JSON})
////@Consumes(MediaType.APPLICATION_JSON)
////@Singleton
//public class JacksonProvider implements ContextResolver<ObjectMapper> {
//    
//    private static final ObjectMapper MAPPER = new ObjectMapper();
//    
//    static {
//      MAPPER.setSerializationInclusion(Include.NON_EMPTY);
//      MAPPER.disable(MapperFeature.USE_GETTERS_AS_SETTERS);
//      //MAPPER.disable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
//    }
// 
//    public JacksonProvider() {
//        System.out.println("Instantiate MyJacksonJsonProvider");
//    }
//     
//    @Override
//    public ObjectMapper getContext(Class<?> type) {
//        System.out.println("MyJacksonProvider.getContext() called with type: "+type);
//        return MAPPER;
//    } 
//}
