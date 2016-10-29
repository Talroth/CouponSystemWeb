package com.CouponSystem.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.CouponSystem.Beans.Company;
import com.CouponSystem.Beans.Coupon;
import com.CouponSystem.Beans.CouponType;
import com.CouponSystem.CouponSystem.CouponSystem;
import com.CouponSystem.Facade.CompanyFacade;
import com.CouponSystem.FacadeException.FacadeException;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;


import DAOException.DAOExceptionErrorType;

@Path("/companyService")
public class CompanyService {

	@Context
	private HttpServletRequest request;
	
	@Context ServletContext context;
	
	
	//private HttpServletResponse response;
	private CouponSystem mainSystem = CouponSystem.getInstance();
	private static final String FACADE_ATTRIBUTE  = "facadeAtt";

	@POST
	@Path("/createCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String createCoupon(Coupon coupon)  {
		try 
		{			
			getFacade().createCoupon(coupon);
			return "ok";
		} 
		catch (FacadeException e) 
		{
			return e.getMessage();
		}
	}


	@DELETE
	@Path("/removeCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String removeCoupon(Coupon coupon)  {

		try
		{
			getFacade().removeCoupon(coupon);
			return "ok";
		} 
		catch (FacadeException e) 
		{
			return e.getMessage();
		}
	}


	@PUT
	@Path("/updateCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updateCoupon(Coupon coupon)  {

		try 
		{
//			Coupon tmpCoupon = new Coupon();
//			tmpCoupon.setId(coupon.getId());
//			tmpCoupon.setTitle(coupon.getTitle());
//			tmpCoupon.setStartDate(coupon.getStartDate());
//			tmpCoupon.setEndDate(coupon.getEndDate());
//			tmpCoupon.setAmount(coupon.getAmount());
//			tmpCoupon.setType(coupon.getType());
//			tmpCoupon.setMessage(coupon.getMessage());
//			tmpCoupon.setPrice(coupon.getPrice());
//			tmpCoupon.setImage(coupon.getImage());
			System.out.println("*" + coupon.getEndDate().toString() + "*");
			getFacade().updateCoupon(coupon);
			return "ok";
		} 
		catch (FacadeException | IllegalArgumentException e) 
		{
			return e.getMessage();
		}

	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCoupon/{id}")
	public Coupon getCoupon(@PathParam("id") long id)  {

		try 
		{
			return getFacade().getCoupon(id);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getAllCoupons")
	public Collection<Coupon> getAllCoupons() throws FacadeException {

		try 
		{
			return getFacade().getAllCoupons();
		} 
		catch (FacadeException e) 
		{
			throw e;
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCouponByType/{couponType}")
	public Collection<Coupon> getCouponByType(@PathParam("couponType") CouponType couponType)  {

		try 
		{
			return getFacade().getCouponByType(couponType);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCouponByPrice/{minPrice},{maxPrice}")
	public Collection<Coupon> getCouponByPrice(@PathParam("minPrice") double minPrice, @PathParam("maxPrice") double maxPrice)  {

		try 
		{
			return getFacade().getCouponByPrice(minPrice, maxPrice);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCouponByEndDate/{endDate}")
	public Collection<Coupon> getCouponByEndDate(@PathParam("endDate") String endDate)  {
		try 
		{
			LocalDateTime endDateFormat =  LocalDateTime.parse(endDate);
			
			return getFacade().getCouponByEndDate(endDateFormat);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCompanyDetails")
	public Company getCompanyDetails()  {

		try 
		{
			return getFacade().getCompanyDetails();
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}

	@POST
	@Path("/uploadImage")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response  uploadImage(@FormDataParam("file") InputStream uploadedInputStream,
							     @FormDataParam("file") FormDataContentDisposition  fileDetail) {
		String uploadedFileLocation = context.getRealPath(File.separator) + "img" + File.separator + fileDetail.getFileName();

		// save it
		try
		{
			writeToFile(uploadedInputStream, uploadedFileLocation);
		}
		catch (IOException e)
		{
		    return Response.status(500).entity("Fail to upload").build();
		}

		String output = "File uploaded to : " + uploadedFileLocation;

		return Response.status(200).entity(output).build();
		
	}
	

	// save uploaded file to new location
	private void writeToFile(InputStream uploadedInputStream, String uploadedFileLocation) throws IOException
	{
		try (OutputStream out = new FileOutputStream(new File(
				uploadedFileLocation)))
		{
			int read = 0;
			byte[] bytes = new byte[1024];

			//out = new FileOutputStream(new File(uploadedFileLocation));
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
			out.flush();
			//out.close();
		}
	}
	
	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/login")
	public String login(@DefaultValue("none") @QueryParam("user") String name, @DefaultValue("none") @QueryParam("password") String password)  {
		try 
		{
			CompanyFacade companyFacade = (CompanyFacade) mainSystem.login(name,  password, "company");
			if (companyFacade != null)
			{
				HttpSession session = request.getSession();
				//TODO: check if new ?
				session.setAttribute(FACADE_ATTRIBUTE, companyFacade);
				return "ok";		
			}
			return "fail";	
		} 
		catch (FacadeException e)
		{
			return e.getMessage();	
		}
	}
	
	//h
	@POST
	@Path("/logout")
	public String logout()
	{
		//TODO: in case of failure add catch
		HttpSession session = request.getSession();
		session.invalidate();
		return "ok";
	}
	
	private CompanyFacade getFacade() throws FacadeException
	{
		HttpSession session = request.getSession(false);
		
		if (session !=null)
		{
			return ((CompanyFacade) session.getAttribute(FACADE_ATTRIBUTE));
		}
		else
		{
			throw new FacadeException(DAOExceptionErrorType.ADMIN_FAIL_LOGIN,"User is not connected");
		}
	}

}
