package com.CouponSystem.Service;

import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
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

import com.CouponSystem.Beans.Company;
import com.CouponSystem.Beans.Coupon;
import com.CouponSystem.Beans.Customer;
import com.CouponSystem.CouponSystem.CouponSystem;
import com.CouponSystem.Facade.AdminFacade;
import com.CouponSystem.FacadeException.FacadeException;

import DAOException.DAOExceptionErrorType;

@Path("/adminService")
public class AdminService 
{
	@Context
	private HttpServletRequest request;
	//private HttpServletResponse response;
	private CouponSystem mainSystem = CouponSystem.getInstance();
	private static final String FACADE_ATTRIBUTE  = "facadeAtt";

	public AdminService()
	{
		
	}

	@POST
	@Path("/createCustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Customer createCustomer(Customer customer) throws FacadeException {
		try 
		{
			return getFacade().createCustomer(customer);			 
		} 
		catch (FacadeException e) 
		{
			System.out.println("Exception was raised");
			System.out.println("** " + e.getMessage());
			throw e;
		}
	}


	@DELETE
	@Path("/removeCustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String removeCustomer(Customer customer)  {
		try 
		{
			getFacade().removeCustomer(customer);
			return "ok";
		} 
		catch (FacadeException e) 
		{
			return e.getMessage();
		}
	}


	@PUT
	@Path("/updateCustomer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updateCustomer(Customer customer) throws FacadeException {
		try 
		{
			getFacade().updateCustomer(customer);
			return "Customer " + customer.getCustName() + " was updated successfully";
		} 
		catch (FacadeException e)
		{
			throw e;
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCustomer/{id}")
	public Customer getCustomer(@PathParam("id") long id)  {

			try 
			{
				return getFacade().getCustomer(id);
			} 
			catch (FacadeException e) 
			{
				return null;
			}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getAllCustomer")
	public Collection<Customer> getAllCustomer()  throws FacadeException {
		try 
		{
			return getFacade().getAllCustomer();
		} 
		catch (FacadeException e) 
		{
			throw e;
		}
	}


	@POST
	@Path("/createCompany")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Company createCompany(Company company) throws FacadeException {

		try 
		{
			return getFacade().createCompany(company);
		} 
		catch (FacadeException e) 
		{
			throw e;
		}
	}


	@DELETE
	@Path("/removeCompany")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String removeCompany(Company company)  
	{
		try 
		{
			getFacade().removeCompany(company);
			return "ok";
		} 
		catch (FacadeException e) 
		{
			return e.getMessage();
		}
	}

	@PUT
	@Path("/updateCompany")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public String updateCompany(Company company) throws FacadeException {

		//Company company = adminFacade.getCompany(companyId);
		try 
		{
			getFacade().updateCompany(company);
			return "ok";
		} 
		catch (FacadeException e)
		{
			throw e;
		}
		
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getCompany/{id}")
	public Company getCompany(@PathParam("id") long id) {
		try 
		{
			return getFacade().getCompany(id);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}

//
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getAllCompanies")
	public Collection<Company> getAllCompanies() throws FacadeException 
	{
		try 
		{
			return getFacade().getAllCompanies();
		} 
		catch (FacadeException e) 
		{
			throw e;
		}
	}
	

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/getCoupons/")
	public Collection<Coupon> getCoupons(Customer customer)  {	
		try 
		{
			return getFacade().getCoupons(customer);
		} 
		catch (FacadeException e) 
		{
			return null;
		}
	}

	@POST
	@Produces(MediaType.TEXT_PLAIN)
	@Path("/login")
		
	public String login(@DefaultValue("none") @QueryParam("user") String userName, @DefaultValue("none") @QueryParam("password") String password) 
	{
		
		try 
		{
			AdminFacade adminFacade = (AdminFacade) mainSystem.login(userName,  password, "admin");
			if (adminFacade != null)
			{
				HttpSession session = request.getSession();
				session.setAttribute(FACADE_ATTRIBUTE, adminFacade);
				return "ok";		
			}
			return "fail";	
		} 
		catch (FacadeException e)
		{
			return e.getMessage();	
		}
							
	}
	
	@POST
	@Path("/logout")
	public String logout()
	{
		//TODO: in case of failure add catch
		HttpSession session = request.getSession();
		session.invalidate();
		return "ok";
	}
	
	private AdminFacade getFacade() throws FacadeException
	{
		HttpSession session = request.getSession(false);
	
		if (session !=null)
		{
			return ((AdminFacade) session.getAttribute(FACADE_ATTRIBUTE));
		}
		else
		{
			throw new FacadeException(DAOExceptionErrorType.ADMIN_FAIL_LOGIN,"User is not connected");
		}
	}
	

}
